import React from 'react'
// import ListProduct from '../../components/ListProduct/index'
import { ListProduct } from '../../components'
import Search from '../Search'
// import './styles.css'

export default function Kategori() {
  return (
    <div className='kategori'>
      <a>Telusuri kategori</a>
      <Search />
      <div className='row'>
        <ListProduct />
      </div>
    </div>
  )
}
