import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { uploadFile } from '../screens/main.slice';

const FILE = "file";
const FIRST_ELEMENT = 0;
const XLS_TYPE = 'application/vnd.ms-excel';
const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

export default function FileForm() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    file: undefined,
                    base64file: "",
                }}
                onSubmit={async (values) => {
                    values.base64file = await getBase64(values.file);
                    dispatch(uploadFile(values));
                }}>
                {(formik) => {
                    return (
                        <div className="flex items-center justify-center w-full h-full py-8 px-8">
                            <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{t("clickToUpload")}</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("xlsOrXlsx")}</p>
                                </div>
                                <input
                                    id="file"
                                    name= "file"
                                    type="file"
                                    className="hidden"
                                    onChange={
                                        (event) => {
                                            const file = event.currentTarget.files[FIRST_ELEMENT];
                                            console.log(file);
                                            if (file.type !== XLSX_TYPE && file.type !== XLS_TYPE) {
                                                setOpenModal(true);
                                            } else {
                                                formik.setFieldValue(FILE, file);
                                                formik.submitForm();
                                            }
                                        }
                                    }/>
                            </label>
                        </div>
                    );
                }}
            </Formik>
            
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {t("errorTypeMessage")}
                    </h3>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}