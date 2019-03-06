import React, { Component, createRef } from 'react';
import './Canvas.scss';

class Canvas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTool: 'pen',
            toolIsActive: false,

            activeDrawingId: null,
            activeDrawing: null,
            drawings: []
        }
    }

    render() {
        return (
            <div>
                <div className="toolbar">
                    <div className={`item ` + (this.state.selectedTool === 'pen' ? 'active' : '')} onClick={this.changeTool.bind(null, 'pen')}>
                        <i className="fas fa-pen"></i>
                        <p>pen</p>
                    </div>
                    <div className={`item ` + (this.state.selectedTool === 'rect' ? 'active' : '')} onClick={this.changeTool.bind(null, 'rect')}>
                        <i className="far fa-square"></i>
                        <p>rectangle</p>
                    </div>

                    <div className={`item ` + (this.state.selectedTool === 'circle' ? 'active' : '')} onClick={this.changeTool.bind(null, 'circle')}>
                        <i className="far fa-circle"></i>
                        <p>circle</p>
                    </div>
                    <div className="item fright" onClick={this.onClickClearCanvas}>
                        <i className="fa fa-broom"></i>
                        <p>clear</p>
                    </div>
                </div>

                <div id="canvas-overlay" ref={this.canvasRef} width="800px" height="800px" onPointerDown={this.drawOnStartCanvas} onPointerUp={this.drawOnEndCanvas} onPointerMove={this.drawOnCanvas}>
                </div>
            </div>
        );
    }

    getMouseCoordinatesInRelationToCanvas = (event) => {
        //const canvasX = document.getElementById('canvas-overlay').target.getBoundingClientRect().x;
        //const canvasY = document.getElementById('canvas-overlay').target.getBoundingClientRect().y;

    }

    changeTool = (tool) => {
        this.setState({
            selectedTool: tool
        });
    }

    onClickClearCanvas = () => {
        this.setState({
            drawings: []
        });
    }

    drawOnCanvas = (event) => {
        if (!this.state.toolIsActive) {
            return;
        }

        console.log(event.nativeEvent);

        var plottingCoordinates = this.getMouseCoordinatesInRelationToCanvas(event);

        switch (this.state.selectedTool) {
            case 'pen': {
                break;
            }

            case 'rect': {
                var activeSvgElement = document.getElementById(this.state.activeDrawingId);
                var rectangle = activeSvgElement.firstElementChild;
                activeSvgElement.style.width = `${event.nativeEvent.layerX + 10}px`;
                activeSvgElement.style.height = `${event.nativeEvent.layerY + 10}px`;
                rectangle.style.width = `${event.nativeEvent.layerX + 10}px`;
                rectangle.style.height = `${event.nativeEvent.layerY + 10}px`;
                break;
            }

            case 'circle': {
                let radius = 100;

                this.context.arc(100, 75, 50, 0, 2 * Math.PI);
                this.context.stroke();

                break;
            }
        }


    }

    drawOnStartCanvas = (event) => {
        switch (this.state.selectedTool) {
            case 'rect': {
                if (!this.state.activeDrawingId) {
                    this.createNewRectangleOnCanvas(event);
                    return;
                }
            }
        }
    }

    drawOnEndCanvas = (event) => {

        switch (this.state.selectedTool) {
            case 'pen': {

            }

            case 'rect': {

            }

            case 'circle': {

            }
        }

        this.setState({
            toolIsActive: false,
            activeDrawingId: null
        });
    }

    createNewRectangleOnCanvas = (event) => {
        var svgElementId = `svg${Math.floor(Math.random() * 1000)}`;
        var svg = document.createElement('svg');
        svg.setAttribute('id', svgElementId);
        svg.setAttribute('key', svgElementId);
        svg.setAttribute("style", `top: ${event.nativeEvent.offsetY}px; left: ${event.nativeEvent.offsetX}px`);

        document.getElementById('canvas-overlay').appendChild(svg);

        var svgns = "http://www.w3.org/2000/svg";

        var rect = document.createElementNS(svgns, 'rect');

        rect.setAttributeNS(null, 'x', 0);
        rect.setAttributeNS(null, 'y', 0);
        rect.setAttributeNS(null, 'height', '100');
        rect.setAttributeNS(null, 'width', '100');
        rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
        document.getElementById(svgElementId).appendChild(rect);

        this.setState({
            toolIsActive: true,
            activeDrawingId: svgElementId
        });
    }
}

export default Canvas;
