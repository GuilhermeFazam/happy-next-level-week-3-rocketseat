import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${process.env.DEV_PATH_UPLOAD_IMAGES}${image.path}`,
            urlMobile: `${process.env.MOBILE_PATH_UPLOAD_IMAGES}${image.path}`,
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    },
};
