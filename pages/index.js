import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

import { Icon } from '@iconify/react';

import copy from "copy-to-clipboard";  

import { Checkbox, Modal } from '@nextui-org/react';

export default function Home() {

    const [superPassword,setSuperPassword] = useState('');
    const [site, setSite] = useState('');

    const [az,setAz] = useState(true);
    const [AZ,setAZ] = useState(true);
    const [num,setNum] = useState(true);
    const [symbol,setSymbol] = useState(true);
    const [memorable,setMemorable] = useState(true);
    const [customLength,setCustomLength] = useState(true);

    const [length,setLength] = useState(8);
    const [increment,setIncrement] = useState(1);

    const [showResult, setShowResult] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    async function generatePassword(){
        console.log('hello');
        await fetch('/api/encrypt/getPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ site: site, az: az, AZ: AZ, num: num, symbol: symbol, memorable: memorable, customLength: customLength, length: length, increment: increment}),
        })
    }

    return (
    <div className={styles.container}>
    <Head>
        <title>Single Password</title>
        <meta name="description" content="Use a Single Password for evrything without any security risk" />
    </Head>

    <Modal
        closeButton
        blur
        open={showResult}
        onClose={() => setShowResult(false)}
    >
        <Modal.Header>
            
        </Modal.Header>
        <Modal.Body>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
                Password Has been Succesfully Copied to the clipboard
            </p>
        </Modal.Body>
        <Modal.Footer>
            <button 
            onClick={()=>{setShowResult(false)}}
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Close
            </button>
        </Modal.Footer>
    </Modal>

    <Modal
        closeButton
        open={showHelp}
        onClose={()=>setShowHelp(false)}
    >
        <Modal.Header>
            <p>Help</p>
        </Modal.Header>
        <Modal.Body>
            <div className='flex flex-col justify-start'>

            </div>
            <p className=" text-gray-300">
                <span className='font-bold'>Super Password:</span> This is used to generate your passwords. Never forget this.
            </p>
            <p className=" text-gray-300">
                <span className='font-bold'>Site:</span> The site which you are trying to log in.
            </p>
            <p className="text-gray-300">
                <span className='font-bold'>Checkboxes:</span> Include or exclude shown chracter sets in the generated password
            </p>
            <p className="text-gray-300">
                <span className='font-bold'>Memorable:</span> Make the password a little bit readable to humans. (will not be random set og characters)
            </p>
            <p className="text-gray-300">
                <span className='font-bold'>Custom Length:</span> Change the length of the generated password
            </p>
            <p className="text-gray-500 dark:text-gray-300">
                <span className='font-bold'>Increment:</span> To generate a different password for the same site, change increment.
            </p>
        </Modal.Body>
    </Modal>

    <nav className="bg-gray-800 shadow">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <h1 className="text-2xl font-bold text-gray-300 md:text-3xl">SinglePassword™</h1>
        </div>
    </nav>

    <div className="w-full px-6 py-16 mx-auto text-center bg-gray-900">
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">Use a Single Super Password across all Web</h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">Remeber a Single Password and generate different Passwords from it to use securely across the Web</p>
            
            <a href='#how'>
            <button className="m-10 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Learn More
            </button>
            </a>  
            <p className="my-5 text-sm text-gray-400 ">Free and Open Source</p>
        </div>

        
        <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-800">
            
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className='flex flex-col content-left'>
                    <label className="text-left text-gray-700 dark:text-gray-200 font-semibold" >Super Password</label>
                    <input 
                    value={superPassword}
                    onChange={e => {setSuperPassword(e.target.value)}}
                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>

                <div className='flex flex-col content-left'>
                    <label className="text-left text-gray-700 dark:text-gray-200 font-semibold" >Site</label>
                    <input 
                    value={site}
                    onChange={e => {setSite(e.target.value)}}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" /> 
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-4 justify-evenly ">
                <div className='flex justify-left'>
                    <Checkbox checked={true} onChange={(e)=>{setAz(az^1);}}>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >a-z</label>
                    </Checkbox>
                </div>
                
                <div className='flex justify-left'>
                <Checkbox checked={true} onChange={(e)=>setAZ(AZ^1)}>
                    <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >A-Z</label>
                </Checkbox>
                </div>

                <div className='flex justify-left'>
                <Checkbox checked={true} onChange={(e)=>setNum(num^1)}>
                    <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >0-9</label>
                </Checkbox>
                </div>

                <div className='flex justify-left'>
                <Checkbox checked={true} onChange={(e)=>setSymbol(symbol^1)}>
                    <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >!@#</label>
                </Checkbox>
                </div>

                <div className='flex justify-left'>
                <Checkbox checked={true} onChange={(e)=>setMemorable(memorable^1)}>
                    <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >Memorable</label>
                </Checkbox>
                </div>

                <div className='flex justify-left'>
                    <Checkbox checked={true} onChange={(e)=>setCustomLength(customLength^1)}>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold text-base" >Custom Length</label>
                    </Checkbox>
                </div>

            </div>

            <div className='flex justify-left flex-col content-left my-10'>
                <label className="text-left text-gray-700 dark:text-gray-200 font-semibold my-auto px-2" >Length</label>
                <input 
                    min={6}
                    max={20}
                    type="range"
                    value={length}
                    onChange={e => {setLength(e.target.value)}}
                    className='px-2 py-2'/>
                <ul className="flex justify-between w-full px-2">
                    <li className="flex justify-center relative"><span className="absolute">6</span></li>
                    <li className="flex justify-center relative"><span className="absolute">8</span></li>
                    <li className="flex justify-center relative"><span className="absolute">10</span></li>
                    <li className="flex justify-center relative"><span className="absolute">12</span></li>
                    <li className="flex justify-center relative"><span className="absolute">14</span></li>
                    <li className="flex justify-center relative"><span className="absolute">16</span></li>
                    <li className="flex justify-center relative"><span className="absolute">18</span></li>
                    <li className="flex justify-center relative"><span className="absolute">20</span></li>
                </ul>
            </div>   

            <div className='flex justify-left flex-col content-left my-10'>
                <label className="text-left text-gray-700 dark:text-gray-200 font-semibold my-auto px-2" >Increment</label>
                <input 
                    min={1}
                    max={5}
                    value={increment}
                    onChange={e => {setIncrement(e.target.value)}}
                    type="range"
                    className='px-2 py-2'/>
                <ul className="flex justify-between w-full px-2">
                    <li className="flex justify-center relative"><span className="absolute">1</span></li>
                    <li className="flex justify-center relative"><span className="absolute">2</span></li>
                    <li className="flex justify-center relative"><span className="absolute">3</span></li>
                    <li className="flex justify-center relative"><span className="absolute">4</span></li>
                    <li className="flex justify-center relative"><span className="absolute">5</span></li>
                </ul>
            </div>          

            <div className="flex justify-center mt-6 content-center content-center">
                <button className="font-semibold px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={generatePassword}
                >Generate and Copy</button>
                <button 
                onClick={()=> {setShowHelp(true)}}
                className="flex items-center mx-2 px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-80">
                    <Icon icon="bxs:help-circle" color="white" width={25} height={25} />
                </button>
            </div>
            
        </section>
    </div>


    <section id='how' className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">How this Works</h1>
                
                <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Think of this as a Password Vault which you don&#39;t have to save your Passwords anywhere
                </p>
                
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <Icon icon="emojione-monotone:digit-one" color="white" width="30" height="30" />
                        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">The Super Password</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                        Find yourself a single password which you won&#39;t ever forget. We&#39;ll call it The Super Password.
                        </p>

                    </div>

                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <Icon icon="emojione-monotone:digit-two" color="white" width="30" height="30" />
                        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Sub Password Generation</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                            We generate sub passwords for each of your logins from the super password
                        </p>

                    </div>
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <Icon icon="emojione-monotone:digit-three" color="white" width="30" height="30" />
                        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Use Sub Passwords</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                            Use Sub passwords for your accounts. If you want to see them again, generate the exact same Password 
                            using the same Super Password
                        </p>

                    </div>
                </div>
            </div>
        </section>



        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-12 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Why should you trust us</h1>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">You are 100% Anonymous</h1>
        
                        <p className="mt-2 text-gray-500 dark:text-gray-400">We do not have any form of account creation and we do not ask any personal data from you</p>
                    </div>
        
                    <div>
                        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">Secure and Strong Passwords</h1>
                        
                        <p className="mt-2 text-gray-500 dark:text-gray-400">We use the strongest and most robust encryption standard that is commercially available today</p>
                    </div>
                    
                    <div>
                    
                        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">We are Open Source</h1>
                    
                        <p className="mt-2 text-gray-500 dark:text-gray-400">SinglePassword™ is 100% Open Source. If you have any doubts about us you can check it for yourself!</p>
                    </div>
                </div>
            </div>
            <div className="container px-6 py-8 mx-auto text-center">
                <button
                    className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 md:mx-0 md:w-auto focus:outline-none">
                    <a href='https://github.com/lakshith-403/single-password'>
                    <div className='flex flex-row justify-between'>
                        <Icon icon="bi:github" color="white" width="30" height="30" />
                        <h1 className="mx-5 text-xl font-semibold text-gray-800 dark:text-white">Source Code on Github</h1>
                    </div>
                    </a>
                    
                </button>
        </div>
        </section>



        

    <footer className="flex justify-center px-4 text-gray-800 bg-white dark:text-white dark:bg-gray-800">
        <div className="container py-6">
            <h1 className="text-lg font-bold text-center lg:text-2xl">
                Join with us to recieve updates <br/> about latest products
            </h1>

            <div className="flex justify-center mt-6">
                <div className="bg-white border rounded-md focus-within:ring dark:bg-gray-800 dark:border-gray-600 focus-within:border-blue-400 focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:focus-within:border-blue-300">
                    <div className="flex flex-wrap justify-between md:flex-row">
                        <input type="email" className="p-2 m-1 text-sm text-gray-700 bg-transparent appearance-none focus:outline-none focus:placeholder-transparent" placeholder="Enter your email" aria-label="Enter your email" />
                        <button className="w-full px-3 py-2 m-1 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded-md dark:hover:bg-gray-600 dark:bg-gray-700 lg:w-auto hover:bg-gray-700">subscribe</button>
                    </div>
                </div>
            </div>

            <hr className="h-px mt-6 border-gray-300 border-none dark:bg-gray-700"/>

            <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
                <div>
                    <a href="https://www.devcreara.com" className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">DevCreara</a>
                </div>

                <div className="flex mt-4 md:m-0">
                    <div className="-mx-4">
                        <a href="https://www.devcreara.com" className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">About</a>
                        <a href="https://www.devcreara.com" className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">Blog</a>
                        <a href="https://www.devcreara.com" className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">News</a>
                        <a href="https://www.devcreara.com" className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

        
    </div>
    )
}
