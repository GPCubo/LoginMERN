import React,{useState,useEffect} from 'react';
import './SettingsUser.css'
import UserWithPicture from './UsersWithPicture';
import UsersWithOutPicture from './UsersWithOutPicture';


function SettingsUser({userInfo}) {
    let {name,rank,_id,picture} =userInfo
    const [image, setImage] = useState(null);
    const [src, selectFile] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 })
    const [result, setResult] = useState(null);

    const handleProfilePicture = (e) =>{
        e.preventDefault()
        const docType = e.target.files[0].type;
        const validExtensions = ['image/jpeg','image/jpg','image/png','image/gif']
        if(validExtensions.includes(docType)){
            // Archivo Valido
            selectFile(URL.createObjectURL(e.target.files[0]))
        }else{
            // Archivo invalido
            alert("No es un archivo invalido")
        }
    }

    const handleSendImg = async () =>{
        if(crop.width === 0){
            alert("Selecciona tu imagen y recortala")
        }else{
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
          
            // New lines to be added
            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(
              image,
              crop.x * scaleX,
              crop.y * scaleY,
              crop.width * scaleX,
              crop.height * scaleY,
              0,
              0,
              crop.width,
              crop.height
            );
            return new Promise(() => {
                canvas.toBlob(
                  (blob) => {
                      setResult(blob)
                  },
                  "image/jpeg",
                  1
                );
              });
        }
    }

    useEffect(() => {
        if (result === null) {
            return
        }else{
            const Nfile = new File([result],"image.jpeg",{type:"image/jpeg"})
            const data = new FormData()
            data.append('image',Nfile)
            fetch(`http://localhost:9000/update-user/${_id}`,{
                method: 'PUT',
                body: data,
            }).then((res) => {
                res.json()
                console.log(res)
            })
            .catch(err => console.error(err))
        }
    }, [result,_id]);

    return ( 
        <>
            <div className="SettingsUser-div-1">
                {
                    picture === null ?  
                    <UsersWithOutPicture  
                    src={src} 
                    crop={crop} 
                    setCrop={setCrop}
                    setImage ={setImage}
                    />
                    :
                    <UserWithPicture 
                    picture={picture}
                    src={src} 
                    crop={crop} 
                    setCrop={setCrop}
                    setImage ={setImage}
                    /> 
                }
                <form className="SettingsUser-form-addImg">
                    <input type="file" id="SettingsUser-input-file-1" hidden={true} name="profilePicture"  onChange={handleProfilePicture}/>
                    {
                     src === null ?
                     <label className="SettingsUser-label-AddImg" id="SettingsUser-btn-AddImg" htmlFor="SettingsUser-input-file-1">Añade una Imagen</label>
                     :
                     <input className="SettingsUser-btn-AddImg" type="button" defaultValue="Recorta y Envia" onClick={handleSendImg} />
                    }
                </form>
                <div className="SettingsUser-div-3">
                    <h1 className="SettingsUser-h1-name">{name}</h1>
                    <h3>{rank === null ? "Usuario":rank.charAt(0).toUpperCase() + rank.slice(1)}</h3>
                    <p className="SettingsUser-p-1">
                        Hola soy Guillermo, un Desarrollador y Ilustrador vectorial . Este proyecto sigue en desarrollo.
                        Para contrataciones:  <a href="https://www.freelancer.com/u/VGuillermoP">Haga Click Aqui </a>
                    </p>
                </div>
            </div>
        </>
     );
}

export default SettingsUser;