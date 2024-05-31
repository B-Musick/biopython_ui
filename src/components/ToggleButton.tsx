import { useState } from "react";

type ToggleButtonProps = {
    buttons: Array<string>,
    toggleFunction: ()=>{}
}

const ToggleButton: React.FC<ToggleButtonProps> = ({buttons, toggleFunction}) => {
    const [active, setActive] = useState(buttons[0])

    const toggle = (button: string) =>{
        setActive(button);
        toggleFunction(button);
    }

    const setToggleColor = (button: string) => {
        return active == button ? 'bg-gray-100' : 'brightness-90 bg-gray-100'
    }

    let toggleButtons = buttons.map((name)=>{
        return <button onClick={()=>toggle(name)} className={`${setToggleColor(name)} w-[100px]`}>{name}</button>
    })

    return (
        <div>
            {toggleButtons}
        </div>
    )
}

export default ToggleButton;