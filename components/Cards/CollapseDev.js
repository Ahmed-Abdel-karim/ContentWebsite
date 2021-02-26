
import Collapse from './Collapse';

const CollapseDev = ({list, lang}) => {
    return (
        <div>
            {
                list && list.map((item,idx) => (
                    <Collapse title={item.tilte} answer={item.description} key={idx} lang={lang} />
                ))
            }
        </div>
    );
}

export default CollapseDev;

