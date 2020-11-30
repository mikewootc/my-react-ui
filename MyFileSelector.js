'use strict'

import React, { Component } from 'react';
import Logger from 'cpclog';

const logger = Logger.createWrapper('MyFileSelector', Logger.LEVEL_DEBUG);

class MyFileSelector extends React.Component{
    constructor(props){
        super(props);

        this.refInput = null;
    }

    render(){
        logger.debug('MyFileSelector this.children:', this.props.children);
        let child = React.cloneElement(
            this.props.children, {
                onClick: async (event) => { 
                    logger.debug('MyFileSelector onClick');
                    if (this.props.onPreSelect) { // 触发选择前的处理
                        // 如果存在预处理, 则预处理执行后, 返回select为真值, 才继续进行文件选择操作
                        const ret = await this.props.onPreSelect(event);
                        if (ret && ret.select) {
                            this.refInput.click()
                        }
                    } else {
                        // 如果没有预处理, 则直接进行文件选择操作.
                        this.refInput.click()
                    }
                }
            }
        );

        return(
            <div id="fileSelector">
                <input type='file' accept={ this.props.inputAccept } style={ ss.inputStyle }
                    ref={ (me) => {this.refInput = me} }
                    onChange={ (e) => {
                        const files = e.target.files;
                        console.log('Files selected:', files);
                        if (this.props.onFilesSelected) {
                            this.props.onFilesSelected(files);
                        }
                    } }
                />
                { child }
            </div>
        )
    }
}

const ss = {
    inputStyle: {
        display             : 'none',
    },
}

//导出组件
export default MyFileSelector;

// vim:set tw=0: