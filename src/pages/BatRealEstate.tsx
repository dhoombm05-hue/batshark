import { Megaphone, Handshake, Search, FileCheck } from "lucide-react";
import IntroPage from "@/components/intro/IntroPage";
import hero from "@/assets/hero-dark.jpg";

const BatRealEstate = () => (
  <IntroPage
    page="realestate" fallbackImage={hero} accent="digital"
    eyebrow="BAT Real Estate" title="بات للعقار"
    subtitle="تسويق ووساطة عقارية تربط المالك بالمشتري والمستأجر بثقة واحترافية"
    aboutTitle="من هي بات للعقار؟"
    aboutText="بات للعقار هي النشاط العقاري لشركة BATSHARK، نعمل في التسويق والوساطة العقارية، ونساعد الملاك على عرض عقاراتهم بأفضل صورة والوصول إلى العميل المناسب، ونساعد الباحثين عن عقار في إيجاد ما يناسبهم بسهولة ووضوح."
    offerings={[
      { icon: Megaphone, title: "التسويق العقاري", text: "تصوير وعرض احترافي للعقار ونشره عبر القنوات المناسبة." },
      { icon: Handshake, title: "الوساطة العقارية", text: "وساطة في البيع والشراء والتأجير بين الأطراف بشفافية." },
      { icon: Search, title: "البحث عن عقار", text: "نختصر عليك البحث ونرشّح خيارات تطابق احتياجك." },
      { icon: FileCheck, title: "إتمام الصفقة", text: "متابعة الإجراءات حتى توقيع العقد بكل وضوح." },
    ]}
    steps={[
      { title: "استلام الطلب", text: "عرض عقار أو طلب البحث عن عقار." },
      { title: "التقييم", text: "دراسة العقار وتحديد خطة التسويق." },
      { title: "التسويق والمطابقة", text: "الوصول للعميل المناسب." },
      { title: "إتمام الصفقة", text: "التفاوض والمتابعة حتى الإغلاق." },
    ]}
    values={["شفافية", "سرعة إنجاز", "معرفة بالسوق"]}
  />
);
export default BatRealEstate;
