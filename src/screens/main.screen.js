import Footer from '../components/footer.component';
import Header from '../components/header.component';
import FileForm from '../components/file-form.component';

export default function MainScreen() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Header></Header>
            <FileForm></FileForm>
            <Footer></Footer>
        </div>
    );
}
