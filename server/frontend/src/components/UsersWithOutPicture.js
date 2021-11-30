import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './UsersWithOutPicture.css'

function UsersWithOutPicture({src,crop,setCrop,setImage}) {
    return ( 
        <>
            {
                src === null  ? 
                <div className="UsersWithOutPicture-div-1" />
                :
                <div className="SettingsUser-div-Crop">
                    <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} imageStyle={{width: "200px"}} ruleOfThirds={true} onImageLoaded={setImage} />
                </div>
            }
        </>
     );
}

export default UsersWithOutPicture;