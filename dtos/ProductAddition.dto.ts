import Contents from "./Contents.dto";
import Faq from "./Faq.dto";
import ProcessStep from "./ProcessStep.dto";
import WhyChooseUs from "./WhyChooseUs.dto";

export default interface ProductAddition {
    benefits:      Contents;
    contents:      Contents;
    deliverables:  Contents;
    faqs:          Faq[] | null;
    prerequisites: Contents;
    processSteps:  ProcessStep[] | null;
    whyChooseUs:   WhyChooseUs[] | null;
}