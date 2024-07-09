import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 flex items-center justify-center">
            <div className="p-4">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. {t("allRightsReserved")}
                </span>
            </div>
        </footer>
    );
}
