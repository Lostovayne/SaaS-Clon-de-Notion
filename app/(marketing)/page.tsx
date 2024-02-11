import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";

const MarketingPage = () => {
    return (
        <div className="flex min-h-full flex-col dark:bg-[#1f1f1f]">
            <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 text-center md:justify-start">
                <Heading />
                <Heroes />
            </div>
            <Footer />
        </div>
    );
};
export default MarketingPage;
