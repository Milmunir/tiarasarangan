import SidebarAdmin from "@/app/components/(Admin)/SidebarAdmin";
import FooterAdmin from "@/app/components/(Admin)/FooterAdmin";
import NavbarAdmin from "@/app/components/(Admin)/NavbarAdmin";
import { DarkModeProvider } from "@/app/(contexts)/DarkModeContext";

const AdminTemplate = ({ children }) => {
  return (
    <DarkModeProvider>
      <div className="flex h-screen overflow-hidden relative">
        <SidebarAdmin />
        <div className="flex flex-col flex-1">
          <NavbarAdmin />
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 px-8 md:ml-64">
            <div id="content" className="pt-6 md:pt-16 overflow-y-auto">
              {children}
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default AdminTemplate;
