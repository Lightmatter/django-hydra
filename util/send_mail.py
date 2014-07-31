from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def send_html_email(template, context, subject, to):
    message = render_to_string("email/%s.txt" % template, context)
    msg = EmailMultiAlternatives(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [to],
    )
    html_content = render_to_string("email/%s.html" % template, context)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
