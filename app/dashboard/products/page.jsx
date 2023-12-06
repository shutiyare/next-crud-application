'use client'
import React, { useEffect, useState } from 'react'
// import styles from './Products.module.css'
import { Card, Progress, Rate, Space, Spin, Typography, Image, List, Badge, Table, Button, message } from 'antd'
import { addToCart, getAllProducts, getCart, getProductsByCategory } from '../../lib/data';
import {
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
    MoneyCollectOutlined,
  } from "@ant-design/icons";
import { DatePicker } from 'antd';
import { Metadata } from 'next'
import Home from '../page'
import { ProductI } from '../../types/interfaces';
import { useParams } from 'next/navigation';
import styles from './product.module.css'
 const metadata = {
    title: 'Products List',
    description: 'products',
}
// {params}:{params:TSuranList}
 function ProductsS() {
    const param=useParams()
    const [product, setProduct] = useState([])
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        (param?.categoryid? 
            getProductsByCategory(param.categoryid)
             : 
             getAllProducts())
        .then((res)=> setProduct(res.products))
        console.log(product)
        setloading(false);
    }, [param])
    
    if(loading){
    return <Spin size='large' spinning />
    }

    return (
        <div>
              <div className={styles.list}>
        <List
        grid={{
            gutter:16,
            column:3,
        }}
        
        loading={loading}
        renderItem={(product,index)=> {
            return (
                <Badge.Ribbon text={product.discountPercentage} 
                color="pink"
                className={styles.itemCardBadge}
                >
            <Card 
            className={styles.cardspace}
            title={product.title}
             key={index} 
             cover={<Image src={product.thumbnail} className={styles.itemCardImage} 
             
             />} actions={[<Rate allowHalf  value={product.rating } />,
             <AddToCartButton item={product}/>]}
             >
                
                <Card.Meta 
                title={<Typography.Paragraph>${product.price} {""}  
                 <Typography.Text delete type='danger'>{parseFloat( product.price + product.price * product.discountPercentage/100).toFixed(2)}
                 </Typography.Text>
                </Typography.Paragraph>} description={<Typography.Paragraph ellipsis={{rows:2 ,expandable:true,symbol:"more"}}>{product.description}</Typography.Paragraph>}>
                    
                </Card.Meta>
            
             </Card>
             </Badge.Ribbon>
                 )
        }}
        dataSource={product}
        >

        </List>
    </div>
        </div>
    );
};
export default ProductsS;

const  AddToCartButton = ({ item }) =>{
    const [loading, setLoading] = useState(false)
    const addProductToCart =(id)=>{
        setLoading(true)
        addToCart(item.id).then(res =>{
            message.success(`${item.title} has been added to cart`)
        })
        setLoading(false)
    }
    return <Button type='default' onClick={ addProductToCart} loading={loading}></Button>
    
}