import React from 'react'
import Card from '../card/Index'
import Search from '../search/Index'
import './styles.css'

export default function Kategori() {
  return (
    <div className='kategori'>
      <a>Telusuri kategori</a>
      <Search />
      <div className='card-kategori'>
        <Card />
      </div>
    </div>
  )
}
