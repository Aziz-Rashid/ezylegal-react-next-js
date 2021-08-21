import Product from "../dtos/Product.dto";

const productSectionsFilter = (product: Product, relatedProducts: Product[]) => {
    const sections:Array<any> = [];

    if (product.product_addition.benefits.content?.length) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.benefits
        });
    }

    if (product.product_addition.prerequisites?.content?.length) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.prerequisites
        });
    }

    if (product.product_addition.processSteps?.length) {
        sections.push({
            component: 'ProcessStepBox',
            data: product.product_addition.processSteps
        });
    }

    if (product.product_addition.contents?.content?.length) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.contents
        });
    }

    if (product.product_addition.deliverables?.content?.length) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.deliverables
        });
    }

    if (product.product_addition.whyChooseUs?.length) {
        sections.push({
            component: 'WhyChooseUsBox',
            data: product.product_addition.whyChooseUs
        });
    }

    if (product.product_addition.faqs?.length) {
        sections.push({
            component: 'FaqBox',
            data: product.product_addition.faqs
        });
    }

    if (relatedProducts?.length) {
        sections.push({
            component: 'RelatedProductBox',
            data: relatedProducts
        });
    }

    const sectionColors: any = (sections.length % 2) 
    ? {
        '0': {
            bgColor: 'skyBlue',
            bgColorBack: 'white'
        },
        '1': {
            bgColor: 'white',
            bgColorBack: 'skyBlue'
        }
    }: {
        '0': {
            bgColor: 'white',
            bgColorBack: 'skyBlue'
        },
        '1': {
            bgColor: 'skyBlue',
            bgColorBack: 'white'
        }
    };
    
    return sections.map((section, i) => {
        return { ...section, ...sectionColors[String(i % 2)]};
    });
};

export default productSectionsFilter;