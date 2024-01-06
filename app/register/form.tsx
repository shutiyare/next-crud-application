'use client'
import React, { FormEvent, useState } from 'react'
import './register.css'
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG/JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    console.log(imageUrl)
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const router = useRouter();
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget)
        const response = await fetch('/api/register',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formdata.get('username'),
                email: formdata.get('email'),
                password: formdata.get('password'),
                image: formdata.get('image'),
                avatar: imageUrl,
            }),
        },);
        // revalidatePath('/register')
        // redirect('/dashboard')
        if (!response.ok && response.status !== 200) {
            message.error('No user registered.')
        }
        message.success('user registered successfully')
        router.push('/login')
        router.refresh();
        console.log({ response })
    }
    return (
        <div className='container'>
            <form className='login-form' onSubmit={handleRegister} autoComplete='off'>
                <h1>Register</h1>
                <label >Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
                <label >Image:</label>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatarUploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    
                >
                    {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                {/* <input type="text" id="username" name="username" placeholder="Enter your username" required /> */}
                {/* <label >Image:</label>
            <input  type="file" id="username" name="image" placeholder="Enter your username" required /> */}
                <label >E-mail:</label>
                <input type="email" id="username" name="email" placeholder="Enter your E-mail" required />

                <label >Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm