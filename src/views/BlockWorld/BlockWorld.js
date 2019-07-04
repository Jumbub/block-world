import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Container, Col, Row, ListGroup, ListGroupItem, Alert, Table, Button, Jumbotron } from 'reactstrap';

import './block-world.css'
import SetupWorld from '../SetupWorld'
import Arrow from '../../interface/Arrow'
import TreeGraph from '../../interface/TreeGraph'
import WorldSolver from '../../logic/WorldSolver'
import WorldFacts from '../../logic/WorldFacts'

const NO_DECISIONS = () => ({ name: '', children: [] })

class BlockWorld extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 4,
    height: 4,
  }

  constructor() {
    super()

    this.state = {
      lastError: null,
      startFacts: new WorldFacts([
        ['nothing hooked'],
        ['space on platform'],
        ['space on platform'],
        ['space on platform'],
        ['space on platform'],
      ]),
      targetFacts: new WorldFacts([
        ['nothing hooked'],
        ['space on platform'],
        ['space on platform'],
        ['space on platform'],
        ['space on platform'],
      ]),
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

    const canSolve = startBlockCheck !== null && startBlockCheck === targetBlockCheck && !solving

    return (
      <>
        <Jumbotron>
          <Container>
            <h1 className="display-3">Backwards computation!</h1>
            <p className="lead">
              This project visualises an implementation of backwards chaining to automatically stack blocks.
            </p>
            <hr className="my-2" />
            <p>
              <a href="https://en.wikipedia.org/wiki/Backward_chaining">
                https://en.wikipedia.org/wiki/Backward_chaining
              </a>
            </p>
            <p>
              In this demonstration there is a robot which can pick up and place blocks.

            </p>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader tag="h4">Available Facts</CardHeader>
                <CardBody>
                  <p>
                    Facts are used to describe the world.
                  </p>
                  <ListGroup>
                    <ListGroupItem>
                      There are no hooked blocks
                    </ListGroupItem>
                    <ListGroupItem>
                      The X block is hooked
                    </ListGroupItem>
                    <ListGroupItem>
                      The X block is on the platform
                    </ListGroupItem>
                    <ListGroupItem>
                      There is a space on the platform
                    </ListGroupItem>
                    <ListGroupItem>
                      The X block is above the Y block
                    </ListGroupItem>
                    <ListGroupItem>
                      The are no blocks above the X block
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader tag="h4">Available Actions</CardHeader>
                <CardBody>
                  <p>
                    Actions are used to manipulate the world.
                  </p>
                  <p>
                    Each action has a set of facts which must be true in order for the action to be possible.
                  </p>
                  <ListGroup>
                    <ListGroupItem>
                      Put the X block on the platform
                      <br /><br />
                      <ul>
                        <li>
                          The X block is hooked
                        </li>
                        <li>
                          There is a space on the platform
                        </li>
                      </ul>
                    </ListGroupItem>
                    <ListGroupItem>
                      Pick up the X block
                      <br /><br />
                      <ul>
                        <li>
                          There are no hooked blocks
                        </li>
                        <li>
                          There are no blocks above the X block
                        </li>
                      </ul>
                    </ListGroupItem>
                    <ListGroupItem>
                      Put the X block on the Y block
                      <br /><br />
                      <ul>
                        <li>
                          The X block is hooked
                        </li>
                        <li>
                          There are no blocks above the Y block
                        </li>
                      </ul>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader tag="h4">Current Facts Visualised</CardHeader>
                <CardBody>
                  <SetupWorld
                    onUpdate={(facts, blockCheck) => this.setState({ startFacts: facts, 'startBlockCheck': blockCheck })}
                    width={this.props.width}
                    height={this.props.height}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader tag="h4">Current Facts</CardHeader>
                <CardBody>
                  {startFacts
                    ? <ListGroup>
                      {startFacts.getFactArray().map((fact, i) => <ListGroupItem key={'fact' + i}>{fact}</ListGroupItem>)}
                    </ListGroup>
                    : null}
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader tag="h4">Target Facts Visualised</CardHeader>
                <CardBody>
                  <SetupWorld
                    onUpdate={(facts, blockCheck) => this.setState({ targetFacts: facts, 'targetBlockCheck': blockCheck })}
                    width={this.props.width}
                    height={this.props.height}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader tag="h4">Target Facts</CardHeader>
                <CardBody>
                  {targetFacts
                    ? <ListGroup>
                      {targetFacts.getFactArray().map((fact, i) => <ListGroupItem key={'fact' + i}>{fact}</ListGroupItem>)}
                    </ListGroup>
                    : null}
                </CardBody>
              </Card>
            </Col>
            <Col>
              {lastError &&
                <Alert color="danger">
                  {lastError}
                </Alert>
              }
              {
                !canSolve &&
                <Alert color="warning">
                  You cannot press "Find solution" until the assumptions are met.
              </Alert>
              }
              <Button
                color="primary"
                size="lg"
                block
                disabled={!canSolve}
                onClick={this.onSolveClick}
              >
                Find solution
            </Button>
              <Card>
                <CardHeader tag="h4">Solution</CardHeader>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Step</th>
                      </tr>
                    </thead>
                    <tbody>
                      {steps
                        ? steps.map((step, i) =>
                          <tr key={'step' + i}>
                            <td scope="row">{i}</td>
                            <td>{WorldFacts.factToString(step)}</td>
                          </tr>)
                        : null
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
            <CardHeader tag="h4">Decision Tree</CardHeader>
            <CardBody>
              <TreeGraph
                tree={decisions}
              />
              <p>
                The tree above shows the decisions made to determine the solution.<br />
              </p>
              <ListGroup>
                <ListGroupItem color="success">Green indicates that the current world contains this fact</ListGroupItem>
                <ListGroupItem color="danger">Red indicates that the current world does not contain this fact</ListGroupItem>
                <ListGroupItem color="info">Blue indicates the required action to satisfy this fact</ListGroupItem>
                <ListGroupItem>Re-evalute facts indicates that the world must be evaluated again, because an action has taken place</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Container>
      </>
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
