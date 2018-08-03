/**
* SingleLine Grid List
*/
/* eslint-disable */
import React from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
// data File
import tileData from './tileData';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }
});


function ImageGridList(props) {

  const { classes } = props;
  return (
    <div>
     
      <GridList className={classes.gridList} cols={4.5}>
        <div>
          <b>{classes.gridList}</b>
        </div>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
             
              actionIcon={
                <div>
                   <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                  <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                  <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>

                </div>
               
              }
            />
          </GridListTile>
        ))}
      </GridList>
  
 <div className="row row-eq-height text-center fondo-videos-seleccionado collapse" id="collapseExample">
              <div className="col-sm-2 col-md-1 col-lg-2">
                   
              </div>
              <div className="col-sm-6 col-md-5 col-lg-6">
              <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/v64KOxKVLVg" ></iframe>
              </div>
              </div>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <div className="fondo-videos-padding-top-desc">
                     <h3 className="text-white">Santiago desde el Aire</h3>

                      </div>
                <div>
                <b className="text-white">8 min</b>
                  <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                  <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                  <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>
                </div>
                  
              </div>

  </div>




    </div>
  );
}

export default withStyles(styles)(ImageGridList);
