import React, { useEffect, useState } from 'react';

const NetworkInterfaces = () => {
    // Your input data
    const inputData = {
        "network_interfaces": "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000\n link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc fq_codel state UP mode DEFAULT group default qlen 1000\n link/ether 06:01:af:75:32:77 brd ff:ff:ff:ff:ff:ff"
    };

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Extract the network interfaces information
        const networkInterfaces = inputData.network_interfaces;

        // Remove "network_interfaces": from the JSON
        const cleanedData = networkInterfaces.replace('"network_interfaces": ', '');

        // Add a combination of numbers and semicolons
        const combination = '1;2;3;4;5';

        // Remove 'n:' where n is any number not preceded by any letter
        let result = cleanedData.replace(/(?<![a-zA-Z])\d+:/g, '');

        // Place 'description ' before any '<'
        result = result.replace(/</g, 'description <');

        // Remove specified words
        const wordsToRemove = ['description', 'mtu', 'qdisc', 'state', 'mode', 'group', 'qlen', 'link/loopback', 'brd'];

        wordsToRemove.forEach(word => {
            const regex = new RegExp(word, 'g');
            result = result.replace(regex, '');
        });

        // Log the final result to the console
        console.log(result + combination);

        // Remove '1;2;3;4;5'
        const cleanedData2 = result.replace(/1;2;3;4;5\s*/, '');

        // Combine last two fields with ':'
        const combinedData = cleanedData2.replace(/(\S+)\s+(\S+)$/, '$1:$2');

        // Split the cleaned data into an array of fields
        const fields = combinedData.split(/\s+/).filter(Boolean);

        // Create an array after every 10 fields
        const arrays = [];
        for (let i = 0; i < fields.length; i += 10) {
            arrays.push(fields.slice(i, i + 10));
        }

        const title = ['interface', 'description', 'mtu', 'qdisc', 'state', 'mode', 'group', 'qlen', 'link/loopback', 'brd'];
        arrays.unshift(title);

        // Log the arrays to the console
        console.log(arrays);

        setTableData(arrays);
    }, [inputData]);

    return (
        <div className='container1'>
            {tableData.length > 0 && (
                <table className='responsive-table' style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            {tableData[0].map((header, index) => (
                                <th key={index} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NetworkInterfaces;
