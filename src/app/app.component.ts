import { Component } from '@angular/core';

interface Node {
  id: number;
  level: number;
  parent: number | null;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Variable Initialization
  nodeInput: string = ''; // html input value
  nodeList: Node[] = []; // stores all nodes
  currentParent: number | null = null; // Parent for which newNode is to be inserted.
  currentLevel: number = 0; // Level at which newNode is to be inserted
  selects: (number | null)[] = []; // Stores Values of select element at each level.
  listStyle:string[] = ['disc', 'circle', 'square']; // to get separate list style at each level.

  // Function: Create newNode with currentLevel, currentParent and provided input value
  createNode(): void {
    if (!this.nodeInput) {
      alert('Empty Values Not Allowed!');
      return;
    }
    const newNode: Node = {
      id: this.nodeList.length,
      level: this.currentLevel,
      parent: this.currentParent,
      value: this.nodeInput,
    };
    this.nodeList.push(newNode);
    this.nodeInput = '';
  }

  // Function: Returns matched nodes with provided level & parent from nodeList.
  getChildren(level: number, parent: number | null): Node[] {
    return this.nodeList.filter(
      (node: Node) => node.level === level && node.parent === parent
    );
  }

  // Function: Sets values of currentLevel and currentParent when any select element changes.
  onSelectChange(
    level: number,
    parent: number | null,
    target: EventTarget | null
  ): void {
    if (!(target instanceof HTMLSelectElement)) return;

    const selectedParent =
      target.value === 'null' ? null : Number(target.value);

    this.selects[level] = selectedParent;
    this.currentLevel = selectedParent === null ? level : level + 1;
    this.currentParent = selectedParent === null ? parent : selectedParent;
  }
}
