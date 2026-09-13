import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const iconStyle = "text-gray-600 group-hover:text-darkColor transition-colors";
const data: Props[] = [
  {
    title: "Visit Us",
    subtitle: "123 Main St, Anytown, USA",
    icon: <MapPin className={iconStyle} />,
  },
  {
    title: "Call Us",
    subtitle: "+1 (555) 123-4567",
    icon: <Phone className={iconStyle} />,
  },
  {
    title: "Work Hours",
    subtitle: "Mon-Fri: 9AM-5PM",
    icon: <Clock className={iconStyle} />,
  },
  {
    title: "Email Us",
    subtitle: "info@company.com",
    icon: <Mail className={iconStyle} />,
  },
];
const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data?.map((item, index) => (
        <ItemContent
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

const ItemContent = ({ title, subtitle, icon }: Props) => {
  return (
    <div className="flex items-center gap-4 hover:bg-gray-50 group p-4 transition-colors">
      {icon}
      <div >
        <h3 className="group-hover:text-darkColor text-gray-900 font-semibold transition-colors">{title}</h3>
        <p className={"text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors"}>{subtitle}</p>
      </div>
    </div>
  );
};

export default FooterTop;
