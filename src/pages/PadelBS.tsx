import { Trophy, RefreshCw, Swords, Package } from "lucide-react";
import IntroPage from "@/components/intro/IntroPage";
import hero from "@/assets/padel-court-hero.jpg";

const PadelBS = () => (
  <IntroPage
    page="padel" fallbackImage={hero} accent="padel"
    eyebrow="Padel BS" title="Padel BS"
    subtitle="ذراع BATSHARK في عالم البادل — ملاعب ومضارب ومستلزمات تحت سقف واحد"
    aboutTitle="من هي Padel BS؟"
    aboutText="Padel BS هي النشاط الرياضي لشركة BATSHARK، نخدم الأندية والمنشآت والأفراد الراغبين في دخول عالم البادل. نوفّر ملاعب جديدة ومستعملة بحالة ممتازة، إلى جانب المضارب والمستلزمات، ونرافق العميل من الفكرة حتى أول مباراة."
    offerings={[
      { icon: Trophy, title: "ملاعب جديدة", text: "ملاعب بادل بمواصفات احترافية للأندية والمنشآت، مع التوريد والتركيب." },
      { icon: RefreshCw, title: "ملاعب مستعملة", text: "ملاعب مستعملة مفحوصة بعناية كخيار اقتصادي بجودة موثوقة." },
      { icon: Swords, title: "مضارب البادل", text: "مضارب لمختلف المستويات من المبتدئ إلى المحترف." },
      { icon: Package, title: "المستلزمات", text: "كرات، حقائب، قبضات، وكل ما يحتاجه اللاعب والملعب." },
    ]}
    steps={[
      { title: "التواصل", text: "نستمع لاحتياجك ونوع المشروع." },
      { title: "الاقتراح", text: "نرشّح الخيار الأنسب: جديد أو مستعمل." },
      { title: "التوريد", text: "نتولّى الشحن والتركيب." },
      { title: "المتابعة", text: "دعم بعد التسليم والمستلزمات." },
    ]}
    values={["جودة موثوقة", "خيارات تناسب الميزانية", "خدمة متكاملة"]}
  />
);
export default PadelBS;
