import React from 'react';
import useStore from "./../../Store/Store";
import {Drawer} from "./../../UI";
import Time from "./../Time/Time";
import Switcher from "./../../UI/Switcher/Switcher";
import {StyledBurger, Section, Heading, Content} from "./Navigation.styles";

const Navigation = (props:OwnProps) => {
  const {drawer, setDrawer, settings: {godMode, showOrbits, flyMode, showLabels}, setSettings} = useStore();

  return (
    <>
      <Drawer visible={drawer} >
        <StyledBurger enabled={drawer} onClick={() => setDrawer(!drawer)}/>
        <Section>
          <Heading>
            Time options
          </Heading>
          <Content>
            {/*<Time />*/}
          </Content>
        </Section>

        <Section>
          <Heading>
            God Mode
          </Heading>
          <Content>
            <Switcher checked={godMode} onChange={() => setSettings({
              godMode: !godMode,
              showOrbits: !godMode,
              showLabels: !godMode
            })} />
          </Content>
        </Section>


        <Section>
          <Heading>
            Fly Mode
          </Heading>
          <Content>
            <Switcher checked={flyMode} onChange={() => setSettings({flyMode: !flyMode})} />
          </Content>
        </Section>

        <Section>
          <Heading>
            Show Orbits
          </Heading>
          <Content>
            <Switcher checked={showOrbits} onChange={() => setSettings({showOrbits: !showOrbits})} />
          </Content>
        </Section>

        <Section>
          <Heading>
            Show Labels
          </Heading>
          <Content>
            <Switcher checked={showLabels} onChange={() => setSettings({showLabels: !showLabels})} />
          </Content>
        </Section>
      </Drawer>
    </>
  );
};

interface OwnProps {}

export default Navigation;