/**
* Simple Grid List
*/
/* eslint-disable */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import GridList, { GridListTile } from 'material-ui/GridList';

// data File
import tileData from './tileData';

function ImageGridList(props) {
  return (
    <div>
      <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={450}>
        <GridList>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </Scrollbars>
    </div>
  );
}

export default ImageGridList;
