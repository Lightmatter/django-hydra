import PropTypes from 'prop-types';
import { getPageBySlug } from 'util/api';
import StreamField from 'components/streamfield/StreamField';

const ContentPage = ({ data }) => {
    // const router = useRouter();
    // const morePosts = posts?.edges;

    // if (!router.isFallback && !post?.slug) {
    //     return <ErrorPage statusCode={404} />;
    // }
    return <>{data && <StreamField stream={data?.body} />}</>;
};

ContentPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export async function getStaticProps({ params }) {
    const data = await getPageBySlug(params.slug.join('/'));
    return {
        props: {
            data,
        },
        unstable_revalidate: 1,
    };
}
export async function getStaticPaths() {
    // const allContentPages = await getAllPageSlugs();
    // we need to update the build to pull from a current api before this can pass circle
    const allContentPages = [];
    return {
        paths:
            allContentPages.map(item => item.meta.htmlUrl.split('/pages')[1]) ||
            [],
        fallback: true,
    };
}
export default ContentPage;
