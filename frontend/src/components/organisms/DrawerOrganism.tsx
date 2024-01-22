import React from 'react';
import ListAtom from '../atoms/ListAtom';
import ListItemMolecule from 'components/molecules/ListItemMolecule';


function DrawerOrganism({ menuItems }: any) {
  return (
    <div>
      <ListAtom>
        {menuItems.map((text: string, index: number) => (
          <ListItemMolecule key={text} text={text} index={index} />
        ))}
      </ListAtom>
    </div>
  );
}

export default DrawerOrganism;
