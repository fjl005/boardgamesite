import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const LAZY_LOAD_TYPE = {
    galorePost: 'galorePost',
    exploreItemsList: 'exploreItemsList',
    exploreMain: 'exploreMain'
}

const LazyLoadImageTemplate = ({ src, alt, width, height, postType }) => {
    let className = '';

    if (postType === LAZY_LOAD_TYPE.galorePost) {
        className = 'galore-post-img';
    } else if (postType === LAZY_LOAD_TYPE.exploreItemsList) {
        className = 'explore-items-img';
    } else if (postType === LAZY_LOAD_TYPE.exploreMain) {
        className = 'explore-main-img';
    }

    return (
        <LazyLoadImage
            className={className}
            src={src}
            alt={alt}
            width={width}
            height={height}
            placeholderSrc='https://res.cloudinary.com/da7edv0cg/image/upload/v1708451909/samples/lazyGrayImage_slfgga.png'
            effect='blur'
        />

    )
}

export default LazyLoadImageTemplate