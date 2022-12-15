import Head from "next/head";
import Image from "next/image";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "../components/button/Button";
import SearchIcon from '@mui/icons-material/Search';
import { Input } from "../components/inputs";

export default function Home(){
    const bookmark = () =>{

    }

    const editProfile = () =>{

    }

    const logout = () =>{

    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <Head>
                <title>HarBer.id - Website Product Price Comparison from Various E-commerce in Indonesia</title>
                <meta name="description" content="HarBer.id description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-4 pb-[3%]">
                    <div className="relative overflow-hidden xl:px-32 3xl:px-[139px] mx-auto items-center justify-center flex sm:justify-between">
                        {/* bikin kondisi kl misalnya blm login headernya munculin yg mana, login yg mana*/}
                        {/* buat greetings user, nanti tarik dari BE buat ambil username user */}
                        <span className="font-bold text-2xl">Hi</span>
                        <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                            <Button>LOGIN</Button>
                        </div>
                        {/* <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                            <AccountCircleIcon fontSize="large" className="cursor-pointer" onClick={editProfile}/>
                            <LogoutIcon fontSize="large" onClick={(logout)} className="ml-[93%] cursor-pointer"/>
                        </div> */}
                    </div>
                </header>
                <div className="relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]">
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src="/assets/images/harber.png"
                            alt=""
                            width={300}
                            height={150}
                        />
                        {/* <span><SearchIcon/></span> */}
                        <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 shadow-lg text-base text-black rounded-lg"></input>
                    </div>
                </div>
                
            </div>
        </div>
    )
}