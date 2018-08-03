/**
* Advanced Grid List
*/
/* eslint-disable */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

// data File
import tileData from './tileData';

function ImageGridList(props) {
  return (
    <div>
      <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={450}>
        <GridList spacing={3}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.featured ? 3 : 1} rows={tile.featured ? 2 : 1}>
              <img className="img-fluid" src={tile.img} alt={tile.title} />
              <GridListTileBar className="gradient-overlay" title={tile.title} titlePosition="top"
                actionIcon={<IconButton> <i className="zmdi zmdi-star text-white"></i> </IconButton>} actionPosition="left" />
            </GridListTile>
          ))}
        </GridList>
      </Scrollbars>
    </div>
  );
}

export default ImageGridList;
