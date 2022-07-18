import React from 'react'
import './styles.css'
import { FiSearch } from 'react-icons/fi';


export default function Search() {
  return (
    <div className='search-container'>
        <button className='default'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Semua
        </button>
        <button className='search-topic'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Hobi
        </button>
        <button className='search-topic-2'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Kendaraan
        </button>
        <button className='search-topic'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Baju
        </button>
        <button className='search-topic-2'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Elektronik
        </button>
        <button className='search-topic-2'>
            <div>
                <FiSearch className='search-icon1'/>
            </div>
            Kesehatan
        </button>
    </div>
  )
}
