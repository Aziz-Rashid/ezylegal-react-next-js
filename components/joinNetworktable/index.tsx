import React, { useState } from 'react'
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
const JoinOurNetworkTable = () => {
    const [data, setData] = useState<number>(0)
    console.log(data)
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Text fontSize="xxl" weight="bold">If you are expert in folowing services or related services <br />
                    then you can definetly Join Us
                </Text>
            </div>
            <Spacer direction="vertical" size={60} />
            <div style={{ width: '80%', margin: 'auto', display: 'flex', boxShadow: " 0px 0px 12px rgba(31, 92, 163, 0.2)" }}>
                <div className="col-md-3" style={{ borderRadius: '12px 0 0px 12px', borderRight: '1px solid #E1E1E1', padding: '0px' }}>
                    <div style={{ background: data == 0 ?'#396AE8' : "", borderBottom: '1px solid #E1E1E1',cursor:'pointer', padding: '15px', paddingLeft: '30px' }} onClick={() => setData(0)}>
                        <Text color={data == 0 ? 'white':'black'}>Property</Text>
                    </div>
                    <div style={{background: data == 1 ?'#396AE8' : "", borderBottom: '1px solid #E1E1E1',cursor:'pointer', padding: '15px', paddingLeft: '30px' }} onClick={() => setData(1)}>
                        <Text color={data == 1 ? 'white':'black'}>Documentation</Text>
                    </div>
                    <div style={{background: data == 2 ?'#396AE8' : "", borderBottom: '1px solid #E1E1E1',cursor:'pointer', padding: '15px', paddingLeft: '30px' }} onClick={() => setData(2)}>
                        <Text color={data == 2 ? 'white':'black'}>Legal Services</Text>
                    </div>
                    <div style={{background: data == 3 ?'#396AE8' : "", padding: '15px', paddingLeft: '30px',cursor:'pointer', }} onClick={() => setData(3)}>
                        <Text color={data == 3 ? 'white':'black'}>Consultaion</Text>
                    </div>
                </div>
                <div className="col-md-9" style={{ borderRadius: '0px 12px 12px 0px' }}>
                    {data == 0 && (
                        <div style={{ padding: '20px' }}>
                            <div>
                                <Text color="lebel2" weight="bold">Fund Raising Agreements</Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Shareholders's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Founder's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Term Sheet Review</Button>
                            </div>
                            <div>
                                <Text color="lebel2" weight="bold">Startup Documents</Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Licensing Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Joint Venture</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Partnership Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Non Disclosure Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Letter of Intent</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Consultancy Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Service Agreement</Button>
                            </div>
                            <div>
                                <Text color="lebel2" weight="bold">Agreements & Contracts</Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Shareholders's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Founder's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Term Sheet Review</Button>
                            </div>
                        </div>
                    )}
                    {data == 1 && (
                        <div style={{ padding: '20px' }}>
                            <div>
                                <Text color="lebel2" weight="bold">Fund Raising Agreements</Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Shareholders's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Founder's Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Term Sheet Review</Button>
                            </div>
                            <div>
                                <Text color="lebel2" weight="bold">Startup Documents</Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Licensing Agreement</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Joint Venture</Button>
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded> Service Agreement</Button>
                            </div>
                            <div>
                                <Text color="lebel2" weight="bold"><b>Agreements & Contracts</b></Text>
                                <Spacer direction="vertical" size={10} />
                                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>Shareholders's Agreement</Button>
                            </div>
                        </div>
                    )}
                    {data == 2 && (
                                <Text color="lebel2" weight="bold">No Data in Legal Services</Text>
                        
                    )}
                    {data == 3 && (
                                <Text color="lebel2" weight="bold">No Data in Consulation</Text>
                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default JoinOurNetworkTable
