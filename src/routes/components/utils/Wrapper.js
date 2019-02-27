import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';
import IconButton from 'material-ui/IconButton';

export default class Wrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAction:true,
        }

    }



    render() {
        const {
            author,
            collapse,
            element,
            position,
            indexElement,
            clickFavorites,
            clickEditObject,
            openShared,
            Style,
            tag,
            showMore,
            onBack,
            onNext,
            truncateTag,
            isfavorite,
            type,
            selectedObject
        } = this.props;

        return (
            <Collapse style={Style} isOpen={collapse === element.rowCollapse} className="anchoCollapseExplorar padding-top-triangulo-collapse">
                {(position === indexElement && element.createRowCollapse) &&
                    <div className="padding-left-first-row-collapse-triangulo">
                        <div className="triangulo-equilatero-bottom"></div>
                    </div>

                }

                <div ref={element.rowCollapse} className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample"
                >

                    <div className="col-sm-2 col-md-1 col-lg-2">
                        <div className="volver-collap-video-image-left">
                            <i onClick={() => {onBack(); this.setState({isAction:true})}} className="zmdi ti-angle-left text-white"></i>
                        </div>

                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >

                        {type === 'image' && collapse === element.rowCollapse &&

                            <img className="image-colapse-max-width-height" src={selectedObject.mediaQualityURL}></img>

                        }


                        {type === 'video' && collapse === element.rowCollapse &&

                            <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                <BigPlayButton position="center" />
                                <source src={selectedObject.mediaQualityURL} />
                            </Player>

                        }
                        {
                            type === 'document' && collapse === element.rowCollapse &&
                            <img className="image-colapse-max-width-height" src={require('../../../assets/img/file.png')}></img>
                        }

                    </div>
                    <div className="col-sm-4 col-md-3 col-lg-4 zindex-collapse-next-close">
                        <div>
                            <i onClick={() => {this.props.closeCollapse(); this.setState({isAction:true})}} className="zmdi   ti-close text-white volver-collap-video-image-right-close-aux"></i>
                            <i onClick={async () => { await this.setState({isAction:true}); onNext()}} className="zmdi   ti-angle-right text-white volver-collap-video-image-right-aux"></i>

                        </div>
                        <div className="fondo-videos-padding-top-desc">
                            <h3 className="text-white">{author}</h3>

                        </div>

                        <div>
                            <b className="text-white"></b>
                            <IconButton onClick={() => {clickEditObject(selectedObject); this.setState({isAction:true});}}> <i className="zmdi zmdi-edit text-white"></i></IconButton>
                            <IconButton onClick={() => {clickFavorites(selectedObject); this.setState({isAction:true})}}> <i id="folderFavoriteIcon" className={`zmdi zmdi-star-outline ${isfavorite}`}></i></IconButton>
                            <IconButton onClick={() => {openShared(selectedObject); this.setState({isAction:true})}}> <i className="zmdi zmdi-share text-white"></i></IconButton>
                            <IconButton onClick={() => { window.open(selectedObject.originalURL, '_blank'); this.setState({isAction:true}) }}> <i className="zmdi zmdi-download text-white"></i></IconButton>
                        </div>



                        {selectedObject !== '-1' &&
                            <div>
                                <div>
                                    {
                                        truncateTag.length > 0 &&
                                        <Fragment>
                                            {
                                                truncateTag.map((tags, numTag) => (
                                                    <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                                                ))

                                            }
                                            <button type="button" onClick={() => showMore()} class="btn btn-sm btn-outline-light">Ver más</button>
                                        </Fragment>
                                    }
                                    {
                                        truncateTag.length === 0 && tag.length > 0 && tag.map((tags, numTag) => (
                                            <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                                        ))
                                    }
                                </div>


                                <div>
                                    {selectedObject.metadata.copyRight === 'free' &&
                                        <span className="text-white">Copy Right: Libre</span>
                                    }

                                    {selectedObject.metadata.copyRight === 'limited' &&
                                        <span className="text-white">Copy Right: Limitado</span>
                                    }
                                    {selectedObject.metadata.copyRight === 'own' &&
                                        <span className="text-white">Copy Right: Propio</span>
                                    }

                                </div>
                                <div>
                                    {selectedObject.metadata.createdDate &&
                                        <span className="text-white">Fecha de creación: {moment(new Date(selectedObject.metadata.createdDate)).format('YYYY-MM-DD')} </span>
                                    }
                                </div>

                                {selectedObject.metadata.licenseFile &&
                                    <div onClick={() => { window.open(selectedObject.metadata.licenseFile, '_blank') }}>
                                        <a href="javascript:void(0)">
                                            Copy Right: CopyRight.pdf  </a>
                                    </div>
                                }


                            </div>
                        }

                    </div>

                </div>

            </Collapse>
        );
    }

}

// export default enhanceWithClickOutside(Wrapper)