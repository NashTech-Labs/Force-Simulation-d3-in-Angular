import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forceSimulation';
  svgWidth: number = 500;
  svgHeight: number = 500;
  svg: any;
  nodes: any = [];

  ngOnInit(){
    this.svg = d3.selectAll('svg')
    .attr('width',this.svgWidth)
    .attr('height',this.svgHeight);
    for(let i=0;i<80;i++){
      this.nodes.push({id: i});
    }
    this.applySimulation();
  }

  applySimulation(){
  //Applying simulation on nodes
  //Negative strength will repel the nodes and positive will attract
  var simulation = d3.forceSimulation(this.nodes)
    .force('charge', d3.forceManyBody().strength(20))
    .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
    .force('collision', d3.forceCollide().radius(20))
    .on('tick', () => this.displayNodes());
  }

  displayNodes() {
      d3.select('svg')
      .selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('fill','blue')
      .attr('r','10')
      .attr('cx', function(d:any) {
        return d.x
      })
      .attr('cy', function(d:any) {
        return d.y
      })
  }
}
