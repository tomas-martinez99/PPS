import React, { PureComponent } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

const data = [
    { name: 'Enero', subs: 20, totalsubs: 20, bajasubs: 24, },
    { name: 'Febrero', subs: 30, totalsubs: 50, bajasubs: 22, },
    { name: 'Marzo', subs: 20, totalsubs: 70, bajasubs: 22, },
    { name: 'Abril', subs: 27, totalsubs: 97, bajasubs: 20, },
    { name: 'Mayo', subs: 18, totalsubs: 115, bajasubs: 21, },
    { name: 'Junio', subs: 23, totalsubs: 138, bajasubs: 25, },
    { name: 'Julio', subs: 34, totalsubs: 172, bajasubs: 21, },
    { name: 'Agosto', subs: 10, totalsubs: 182, bajasubs: 21, },
    { name: 'Septiembre', subs: 35, totalsubs: 217, bajasubs: 21, },
    { name: 'Octubre', subs: 25, totalsubs: 242, bajasubs: 21, },
    { name: 'Noviembre', subs: 33, totalsubs: 275, bajasubs: 21, },
    { name: 'Diciembre', subs: 32, totalsubs: 307, bajasubs: 21, },
];

export default class Statistics extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/simple-area-chart-4y9cnl';
    render() {
        return (
            <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer >
                        <LineChart
                            data={data}
                            margin={{top: 10, right: 30,left: 0,bottom: 0}}
                            style={{ backgroundColor: 'white', padding: '10px', marginBottom: '20px' }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="totalsubs" stroke="blue" />
                        </LineChart>
                    </ResponsiveContainer>
                <div></div>
                <div></div>
                <ResponsiveContainer >
                    <LineChart
                        data={data}
                        margin={{top: 10,right: 30,left: 0,bottom: 0,}}
                        style={{ backgroundColor: 'white', padding: '10px', marginBottom: '20px' }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="subs" stroke="green" />
                        <Line type="monotone" dataKey="bajasubs" stroke="red" />
                    </LineChart>
                </ResponsiveContainer>
               
            </div>
        );
    }
}
