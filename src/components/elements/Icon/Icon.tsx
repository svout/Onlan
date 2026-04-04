import {ReactSVG} from "react-svg";
import type {Props as ReactSVGProps} from "react-svg/dist/types";

type SvgSource = string | { src: string };

interface IIconProps extends Omit<ReactSVGProps, 'src' | 'ref'> {
    src: SvgSource;
}

export default function Icon(props : IIconProps ) {
    const {src, ...otherProps} = props;
    const resolvedSrc = typeof src === 'string' ? src : src?.src;
    if (!resolvedSrc) return null;

    return (
        <ReactSVG src={resolvedSrc} {...otherProps}/>
    )
}
