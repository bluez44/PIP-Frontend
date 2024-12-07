import './style.css'
import { useState, useEffect, useMemo } from 'react'

export default function ProvinceList({ isShowProvinceList, location, setNewJob }) {
    const [provinces, setProvinces] = useState([])
    const [filtedProvinces, setFiltedProvinces] = useState([])

    useEffect(() => {
        if(isShowProvinceList) {
        async function getProvinces() {
            await fetch('https://provinces.open-api.vn/api')
            .then(response => response.json())
            .then(json => setProvinces(json))
            .catch(err => console.log(err))
        }
        getProvinces()
        }
    }, [isShowProvinceList])

    useMemo(() => {

        const newProvinces = provinces.filter((province) => province.name.toLowerCase().includes(location?.toLowerCase() || ''))
    
        setFiltedProvinces(newProvinces)
    
    }, [provinces, location])

    const handleAddressChange = (addr) => {
        const value  = addr;

        console.log(setNewJob)
        setNewJob(prev => ({...prev, location: value }))
        // setNewUser({...newUser, address: value });
    }

  return (

    <ul className='provinces_list position-absolute w-100'>
        {
            filtedProvinces.map(province => (
                <li className='provinces_item' 
                    key={province.code} 
                    onClick={e => handleAddressChange(province.name)}
                >
                    {province.name}
                </li>
            ))
        }
    </ul>
    
  )
}
