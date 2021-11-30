import React from 'react';
import './UsersWithPicture.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function UserWithPicture({picture,src,crop,setCrop,setImage}) {
    return ( 
        <>
            {
                src === null ? 
                <img src={"/upload/"+picture} alt="profileImg" className="UsersWithPicture-imgProfile" />
                :
                <div className="SettingsUser-div-Crop">
                    <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} imageStyle={{width: "200px"}} ruleOfThirds={true} onImageLoaded={setImage} />
                </div>
            }
        </>
     );
}

export default UserWithPicture;