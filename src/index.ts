type SubnetInfo = {
    networkAddress: string;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    broadcastAddress: string;
};

function ipToString(ip: number): string {
    return [
        (ip >> 24) & 0xff,
        (ip >> 16) & 0xff,
        (ip >> 8) & 0xff,
        ip & 0xff
    ].join('.');
}

function ipStringToNumber(ip: string): number {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function calculateSubnetMaskBits(subnetCount: number): number {
    let bits = 0;
    while ((1 << bits) < subnetCount) {
        bits++;
    }
    return bits;
}

/*
A - 8
B - 16
C - 24
*/

function getSubnetInfo(baseIp: string, subnetCount: number): SubnetInfo[] {
    const baseIpNum = ipStringToNumber(baseIp);
    const baseMaskBits = 25; 
    const additionalBits = calculateSubnetMaskBits(subnetCount);
    const subnetMaskBits = baseMaskBits + additionalBits;
    const subnetMask = -1 << (32 - subnetMaskBits);
    const subnetSize = 1 << (32 - subnetMaskBits);

    let subnets: SubnetInfo[] = [];

    for (let i = 0; i < subnetCount; i++) {
        const subnetBaseIp = baseIpNum + (i * subnetSize);
        const broadcastIp = subnetBaseIp + subnetSize - 1;

        subnets.push({
            networkAddress: ipToString(subnetBaseIp),
            subnetMask: ipToString(subnetMask),
            firstHost: ipToString(subnetBaseIp + 1),
            lastHost: ipToString(broadcastIp - 1),
            broadcastAddress: ipToString(broadcastIp)
        });
    }

    return subnets;
}


const baseIp = "183.27.57.0"; // IP адрес сети
const subnetCount = 8; // Количество подсетей

const subnets = getSubnetInfo(baseIp, subnetCount);

subnets.forEach((subnet, index) => {
    console.log(`Subnet ${index + 1}:`);
    console.log(`  Network Address: ${subnet.networkAddress}`);
    console.log(`  Subnet Mask: ${subnet.subnetMask}`);
    console.log(`  First Host: ${subnet.firstHost}`);
    console.log(`  Last Host: ${subnet.lastHost}`);
    console.log(`  Broadcast Address: ${subnet.broadcastAddress}`);
    console.log('');
});

function findSubnetClass(ipAddress: string): string {
    const ipParts: number[] = ipAddress.split('.').map(part => parseInt(part));

    const firstOctet: number = ipParts[0];
    if (firstOctet >= 1 && firstOctet <= 126) {
        return 'A';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        return 'B';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        return 'C';
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        return 'D';
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        return 'E';
    } else {
        return 'Unknown';
    }
}


const ipAddress: string = '172.16.0.0';
const subnetClass: string = findSubnetClass(ipAddress);
console.log(`IP-адрес ${ipAddress} принадлежит классу ${subnetClass} маски подсети.`);