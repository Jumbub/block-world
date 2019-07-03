import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Container, Col, Row } from 'reactstrap';

import './block-world.css'
import SetupWorld from '../SetupWorld'
import Arrow from '../../interface/Arrow'
import TreeGraph from '../../interface/TreeGraph'
import WorldSolver from '../../logic/WorldSolver'
import WorldFacts from '../../logic/WorldFacts'

const NO_DECISIONS = () => ({name:'', children: []})

class BlockWorld extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 4,
    height: 4
  }

  constructor() {
    super()

    this.state = {
      lastError: null,
      startFacts: null,
      targetFacts: null,
      startBlockCheck: null,
      targetBlockCheck: null,
      solving: false,
      decisions: NO_DECISIONS(),
      steps: null
    }

    this.onSolveClick = this.onSolveClick.bind(this)
  }

  render() {
    const { decisions, steps, startBlockCheck, targetBlockCheck, lastError, solving, startFacts, targetFacts } = this.state

    return (
      <Container>
        {lastError &&
          <Card>
            <CardHeader>Something went wrong</CardHeader>
            <CardBody>
            <p>
              {lastError}
            </p>
            </CardBody>
          </Card>
        }
        <Row>
          <Col>
            <Card>
              <CardHeader>Current World</CardHeader>
              <CardBody>
              <SetupWorld
                onUpdate={(facts, blockCheck) => this.setState({startFacts: facts, 'startBlockCheck': blockCheck})}
                width={this.props.width}
                height={this.props.height}
              />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Decision World Facts</CardHeader>
              <CardBody>
              {startFacts
                ? <ul>
                    {startFacts.getFactArray().map((fact, i) => <li key={'fact'+i}>{fact}</li>)}
                  </ul>
                : null}
              </CardBody>
            </Card>
          </Col>
          <Col>
          <Arrow
            onClick={
              startBlockCheck !== null && startBlockCheck === targetBlockCheck && !solving
                ? this.onSolveClick
                : null
            }
            />
          </Col>
          <Col>
            <Card>
              <CardHeader>Target World</CardHeader>
              <CardBody>
              <SetupWorld
                onUpdate={(facts, blockCheck) => this.setState({targetFacts: facts, 'targetBlockCheck': blockCheck})}
                width={this.props.width}
                height={this.props.height}
              />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Target World Facts</CardHeader>
              <CardBody>
              {targetFacts
                ? <ul>
                    {targetFacts.getFactArray().map((fact, i) => <li key={'fact'+i}>{fact}</li>)}
                  </ul>
                : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="vertical-group">
          <Card>
            <CardHeader>Solution</CardHeader>
            <CardBody>
              <p>
                The following steps are required to make the current world reach the target world.
              </p>
              <strong>Steps: </strong>
              <ol>
                {steps
                  ? steps.map((step, i) => 
                    <li key={'step'+i}>
                      {WorldFacts.factToString(step)}
                    </li>)
                  : 'None (the target world is the same)'
                }
              </ol>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Decision Tree</CardHeader>
            <CardBody>
            <TreeGraph
              tree={decisions}
            />
            <p>
              The tree above shows the decisions made to determine the solution.<br/>
            </p>
            <div className="legend">
              <div className="symbol" style={{color: 'rgb(50, 200, 50)'}}>Green</div>
              <div>indicates the current world has this fact</div>
            </div>
            <div className="legend">
              <div className="symbol" style={{color: 'rgb(200, 50, 50)'}}>Red</div>
              <div>indicates the current world is missing this fact</div>
            </div>
            <div className="legend">
              <div className="symbol" style={{color: 'rgb(50, 50, 200)'}}>Blue</div>
              <div>indicates the required action to achieve the missing fact</div>
            </div>
            <p>
              <strong>Explanation of internal logic:</strong>
            </p>
            <ol className="numbered">
              <li>Find a fact in the target world which is missing from the current world</li>
              <li>If a fact is missing from the current world -
                <ol>
                  <li>Find the action which will set this fact</li>
                  <li>Recursively call step 1, but with the required facts to perform the action as the target world</li>
                  <li>Store the action as a step, and apply it to the current world</li>
                  <li>Go back to step 1</li>
                </ol>
              </li>
              <li>Return the steps necessary to achieve the target world and the updated current world</li>
            </ol>
            </CardBody>
          </Card>
        </div>
      </Container>
    )
  }


  /**
   * On the solve button being clicked.
   */
  onSolveClick() {
    const { startFacts, targetFacts, startBlockCheck, targetBlockCheck } = this.state

    if (
      // Worlds have not been initialised
      (!startFacts || !targetFacts)
      // Worlds do not have matching blocks
      || (startBlockCheck === null || startBlockCheck !== targetBlockCheck)
    ) {
      return null
    }

    // Solve world, save errors
    let solveError = null, steps = null, tree = NO_DECISIONS()
    try {
      steps = WorldSolver.solve(startFacts.clone(), targetFacts.clone(), tree)
    } catch (error) {
      solveError = error.toString()
    }

    this.setState({
      lastError: solveError,
      solving: false,
      steps: steps,
      decisions: tree
    })
  }
}

export default BlockWorld
