import React, { useEffect } from 'react';
import './App.css';
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerComponent, IgcDockManagerPaneType, IgcSplitPaneOrientation } from 'igniteui-dockmanager';

/* eslint-disable */
declare global {
  namespace JSX {
      // tslint:disable-next-line:interface-name
      interface IntrinsicElements {
          "igc-dockmanager": any;
      }
  }
}
/* eslint-enable */

defineCustomElements();

function createContentPane(contentID: string, paneHeader: string): any {
  const pane = {
      // size: 150,
      header: paneHeader,
      type: IgcDockManagerPaneType.contentPane,
      contentId: contentID
  };
  return pane;
};

function createSplitPane(orientation: IgcSplitPaneOrientation, contentPanes: any[], size?: number): any {
  const pane =  {
      type: IgcDockManagerPaneType.splitPane,
      orientation: orientation,
      panes: contentPanes,
      size: size
  };
  return pane;
}

function createTabPane(orientation: IgcSplitPaneOrientation, contentPanes: any[], size?: number): any {
  const pane =  {
      type: IgcDockManagerPaneType.documentHost,
      size: size,
      rootPane: {
          type: IgcDockManagerPaneType.splitPane,
          orientation: orientation,
          panes: [
              {
                  type: IgcDockManagerPaneType.tabGroupPane,
                  panes: contentPanes
              }
          ]
      }
  };
  return pane;
}

function App() {

  useEffect(() =>
  {
    const pane1 = createContentPane('content1', 'Content Pane 1');
    const pane2 = createContentPane('content2', 'Unpinned Pane 1');
    pane2.isPinned = false;

    const pane3 = createContentPane('content3', 'Document 1');
    const pane4 = createContentPane('content4', 'Document 2');

    const contentPane5 = createContentPane('content5', 'Unpinned Pane 2');
    contentPane5.isPinned = false;

    const pane6 = createContentPane('content6', 'Tab 1');
    const pane7 = createContentPane('content7', 'Tab 2');
    const pane8 = createContentPane('content8', 'Content Pane 2');
    const pane9 = createContentPane('content9', 'Floating Pane');

    const splitPane1 = createSplitPane(IgcSplitPaneOrientation.horizontal, [ pane1, pane2 ]);
    const splitPane2 = createSplitPane(IgcSplitPaneOrientation.horizontal, [ pane3, pane4 ]);

    const dockManager: IgcDockManagerComponent = document.getElementById("dockManager") as IgcDockManagerComponent;

    dockManager.layout = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          splitPane1,
          splitPane2
        ]
      }
    };
    
  }, []);
  
  return (
    <div style={{height: '800px'}}>
      <igc-dockmanager id="dockManager">
        <div slot="content1">Content 1</div>
        <div slot="content2">Content 2</div>
        <div slot="content3">Content 3</div>
        <div slot="content4">Content 4</div>
        <div slot="content5">Content 5</div>
        <div slot="content6">Content 6</div>
        <div slot="content7">Content 7</div>
        <div slot="content8">Content 8</div>
        <div slot="content9">Content 9</div>
      </igc-dockmanager>
    </div>
  );
}

export default App;
