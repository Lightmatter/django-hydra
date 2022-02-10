(function () {      
    var anonymousId = ''
    const anonymousIdKey = '{{ anonymousIdKey }}'
    var pageAnalytics = {}
    var apiEndpoint = window.location.search.includes('dataApi=localhost') ?
        '{{ endpoints.local_tracking_api }}' : '{{ endpoints.tracking_api }}'
    var analyticsLogging = {% if logging %}true{% else %}false{% endif %}

    let forms = []
    let modals = []

    if(analyticsLogging) console.log('apiEndpoint', apiEndpoint)

    async function lookupElementByXPath(inputXPath) {
        return new Promise(function (resolve, reject) {
            let node = null
            let ct = 0
            const ctMax = 20
            const interval = 500
        
            const findElement = (xpath) => {
                var evaluator = new XPathEvaluator()
                var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                node = result.singleNodeValue
        
                if(!node) {
                    if(++ct < ctMax) setTimeout(() => {
                        if(analyticsLogging) console.log(`polling ct(${ct}) for xpath: ${xpath}`)
                        findElement(xpath)
                    }, interval)
                }
            }
        
            findElement(inputXPath)
        
            if (node) {
                resolve({ nodeFound: true, node: node, xpath: inputXPath })
            } else {
                resolve({ nodeFound: false, node: null, xpath: inputXPath })
            }
        })
    }

    function setAnonymousId(anonymousIdValue) {
        function setCookie(cname, cvalue, exdays) {
            var d = new Date()
            d.setTime(d.getTime() + (exdays*24*60*60*1000))
            var expires = 'expires='+ d.toUTCString()
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
        }
        function getCookie(cname) {
            var name = cname + '='
            var decodedCookie = decodeURIComponent(document.cookie)
            var ca = decodedCookie.split(';')
            for(var i = 0; i <ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
            }
            return ''
        }

        let uuid = getCookie(anonymousIdKey)
        if(!uuid) {
            uuid = localStorage.getItem(anonymousIdKey)
            if(uuid) setCookie(anonymousIdKey, uuid)
        }
        if(!uuid) {
            setCookie(anonymousIdKey, anonymousIdValue)
            localStorage.setItem(anonymousIdKey, anonymousIdValue)
            uuid = anonymousIdValue
        }
        anonymousId = uuid
    }

    /* HTTP POST */
    async function httpPost(theUrl, payload) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        
        if(!payload.properties) payload.properties = {}
        payload.properties.url = window.location.href 
        if(analyticsLogging) console.log('payload', payload)
        xmlhttp.send(JSON.stringify(payload))
        
        return xmlhttp.responseText
    }

    /* Element in Viewport */
    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    
    /* Tracking Identity */
    var trackIdentify = (email) => httpPost(apiEndpoint + '/track', {
        type: 'Identify',
        anonymousId,
        traits: { email }
    })
            
    /* Page Viewed */
    var trackPageView = () => httpPost(apiEndpoint + '/page_view', {
        type: "PageView",
        anonymousId, 
        category: pageAnalytics.category || null, 
        name: pageAnalytics.name || null, 
        properties: {
            ...pageAnalytics.properties,
            documentTitle: document.title
        } || null
    })

    /* Tracking Event */
    var trackEvent = (event, properties) => {
        httpPost(apiEndpoint + '/track', { type: 'Track', anonymousId, event, properties })
    }

    /* Before Page Unloaded */
    let startTimestamp = Date.now()
    window.onbeforeunload = () => {
        const millis = Date.now() - startTimestamp;
        trackEvent('PageInteraction', {
            seconds: parseFloat((millis / 1000).toFixed(2)),
            percentage: maxScroll,
            name: pageAnalytics.name,
            category: pageAnalytics.category,
            documentTitle: document.title
        })
    }

    /* Scroll logic */
    let maxScroll = 0   
    document.addEventListener('scroll', () => {
        // Form In Viewport
        forms.map(form => {
            if(form.seen) return
            else if(isElementInViewport(form.el)) {
                form.seen = true
                trackEvent('FormInteraction', form.properties)
            }
        })
    
        // Scroll Max Logic
        const offset = window.scrollY / (document.body.offsetHeight - window.innerHeight)
        if(offset <= maxScroll) return
        else maxScroll = offset
    })

    function setup() {  
        if(analyticsLogging) console.log('setting up...')             
        function resetFormSubmissionFlagInMilliseconds(time) {
            window.setTimeout(() => { formSubmitted = false }, time);
        }

        function validateEmail(email) {
            const isValidEmail = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g)
            return isValidEmail ? true : false
        } 

        function getFormInputs(inputs) {
            return Array.from(inputs).map(input => {
                if(input.type === 'password' || input.name.includes('password')) return

                email = input.name === 'email' || 
                    input.type === 'email' ||
                    input.placeholder.includes('email') ||
                    validateEmail(input.placeholder)
                        ? input.value : null
                return {
                    field: input.name || input.type,
                    value: input.value
                }
            })
        }

        /* Selected (Clicked) Logic */
        if(pageAnalytics.events) {
            pageAnalytics.events.map(event => {
                const nodesSnapshot = document.evaluate(event.xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
            
                for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
                    nodesSnapshot.snapshotItem(i).addEventListener("click", () => {
                        trackEvent('Selected', {
                            name: event.eventName ? event.eventName : null,
                            label: event.label ? event.label : null,
                            location: event.location ? event.location : null,
                        })
                        pageAnalytics.events.shift() // remove "tagged" element
                    })
                }
            })
        }

        /* Form Logic */
        if(pageAnalytics.forms) {
            let email = null
            let formSubmitted = false

            pageAnalytics.forms.map(async (form) => {
                const formResponse = await lookupElementByXPath(form.xpath)
                const formSubmitBtnResponse = await lookupElementByXPath(form.xpathSubmitBtn)

                if(analyticsLogging) console.log('formResponse', formResponse, 'formSubmitBtnResponse', formSubmitBtnResponse, form.xpathSubmitBtn)
                if (!formResponse.nodeFound || !formSubmitBtnResponse.nodeFound) return
    
                forms.push({name: form.Name, location: form.Location, seen: false, el: formResponse.node, properties: form})
                pageAnalytics.forms.shift() // remove "tagged" form

                formSubmitBtnResponse.node.addEventListener("click", () => { 
                    if(formSubmitted) return
                    formSubmitted = true  

                    resetFormSubmissionFlagInMilliseconds(3000)

                    const inputs = formResponse.node.querySelectorAll('input:not([type="submit"]), textarea')
                    const fields = getFormInputs(inputs)
                    trackEvent('FormSubmitted', {
                        ...form,
                        fields
                    })

                    if(email) trackIdentify(email)
                    
                })
            })
        }

        /* Modal Logic */
        if(pageAnalytics.modals) {
            pageAnalytics.modals.map(modal => {
                const nodesSnapshot = document.evaluate(modal.xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) 
                const modalEl = nodesSnapshot.snapshotItem(0)
                if (!modalEl) return

                modals.push({seen: false, el: modalEl, properties: modal})
            })
        }
    } // setup

    async function httpGet(theUrl) {
        return new Promise(function (resolve, reject) {
            var response = {}
            var xmlhttp = new XMLHttpRequest()
            xmlhttp.open( "GET", theUrl + '?referer=' + window.location.href, true )
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

            xmlhttp.onload = function() {
                if (xmlhttp.status != 200) {
                    reject({ status: this.status, statusText: xmlhttp.statusText})
                } else {
                    response = xmlhttp.responseText
                    const responseObj = JSON.parse(response)
                    pageAnalytics = responseObj.dictionary
                    if(analyticsLogging) window.testing = pageAnalytics
                    setAnonymousId(responseObj.uuid)
                    setup()
                    resolve({ status: 'successful', response: xmlhttp.response})
                }
            }
            
            xmlhttp.onerror = function() {
                reject({ status: this.status, statusText: xmlhttp.statusText})
            }

            xmlhttp.send()
        })
    } // httpGet


    // On Window Load
    window.addEventListener('load', async () => {
        const didGetEvents = await httpGet(apiEndpoint + '/events')

        if(didGetEvents.status === 'successful') {
            trackPageView()

            // On SPA DOM change or initial page load
            let domDidUpdate = false
            const callbackDOMChange = function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    if (!domDidUpdate && mutation.type === 'childList') {
                        domDidUpdate = true
                        setup()
                        break
                    }
                }
    
                setTimeout(() => {
                    domDidUpdate = false;
                }, 3000)
            };
    
            const target = document.body
            const observer = new MutationObserver(callbackDOMChange)
            observer.observe(target, { childList: true, subtree: true })
        }
    });
})();