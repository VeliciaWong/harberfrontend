import Axios from "axios"
import download from "downloadjs"

export const axiosLocal = Axios.create({
    baseURL: 'http://localhost:8091/api'
})
  

export const getProductPage = async (pageParam = 0, keywordParam, filterParam) =>{
    const result = await axiosLocal.get(`/product?page=${pageParam}&name.contains=${keywordParam}&categoryId.equals=${filterParam?.category?.id ? filterParam?.category?.id :""}&price.lessThan=${filterParam?.maxPrice ? filterParam?.maxPrice:""}&price.greaterThan=${filterParam?.minPrice ? filterParam?.minPrice:""}&location.contains=${filterParam?.location ? filterParam?.location:""}&rating.contains=${filterParam?.rating?.value ? filterParam?.rating?.value :""}`)
    // .then(res => {
    //     localStorage.setItem("totalProduct", res.headers.get('X-Total-Count'));

    // })
    return result.data
    // console.log(result.data)
}

export const getWishlistPage = async (pageParam = 0, filterParam) =>{
    const token = localStorage.getItem("token");
    const result = await axiosLocal.get(`/wish_list?page=${pageParam}&categoryId.equals=${filterParam?.category?.id ? filterParam?.category?.id :""}&price.lessThan=${filterParam?.maxPrice ? filterParam?.maxPrice:""}&price.greaterThan=${filterParam?.minPrice ? filterParam?.minPrice:""}&location.contains=${filterParam?.location ? filterParam?.location:""}&rating.contains=${filterParam?.rating?.value ? filterParam?.rating?.value :""}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // console.log(result.data)
    return result.data
}

export const getProductById = async (idParam) =>{
    const result = await axiosLocal.get(`/product/${idParam}`)
    console.log(result.data)
    return result.data
}

export const saveWishlist = async(idParam) =>{
    const token = localStorage.getItem("token");
    await axiosLocal.post(`/wish_list/save/${idParam}`,{}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteWishlist = async(idParam)=>{
    const token = localStorage.getItem("token");
    await axiosLocal.delete(`/wish_list/product/${idParam}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getUserData= async() => {
    // getJsonData: async () =>{
        const fileName =  "Account_List.xlsx";
        await axiosLocal.get(`/user_export`,{
            headers : {'Content-Type' : `application/csv`}, responseType: 'blob',
        }).then(res => {
            const content = res.headers[`content-type`];
            download(res.data, fileName, content)
        })
    // }
}
// export const saveEditProfile = async(idParam) =>{
//     const token = localStorage.getItem("token");
//     await axiosLocal.delete(`/user/${idParam}`,{
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
// }

// export const getUserDetail = async()=>{
//     await axiosLocal.get(`/user/see_my_profile`,{
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
// }

// export const checkIsWishlist = async(idParam)=>{
//     const token = localStorage.getItem("token");
//     const result = await axiosLocal.get(`/check_wishlist/${idParam}`,{
//         headers: {
//             'Authorization': `Bearer ${token}`
//         } 
//     })
//     // console.log(result.data)
//     return result.data
// }

// export const getProductComparison = async(nameParam) =>{
//     const result = await axiosLocal.get(`/product?name.contains=${nameParam}`)
//     return result.data
// }
// export const getProductByKeyword = async (keywordParam) =>{
//     const result = await axiosLocal.get(`/product?name.contains=${keywordParam}`)
//     return result.data
// }