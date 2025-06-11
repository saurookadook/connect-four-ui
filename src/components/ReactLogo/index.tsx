import reactLogo from '@src/assets/react.svg';
import { AnchorLink } from '@src/components';

function ReactLogo() {
    return (
        <AnchorLink href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
        </AnchorLink>
    );
}

export default ReactLogo;
