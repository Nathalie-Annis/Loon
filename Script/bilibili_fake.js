// 解析 URL 获取 vmid
let vmidMatch = $request.url.match(/&vmid=(\d+)/);
let vmid = vmidMatch ? vmidMatch[1] : null;

console.log(vmid);
console.log($argument.uid);

// 如果 vmid 与 uid 匹配，则继续执行脚本逻辑
if (vmid && $argument.uid && vmid === $argument.uid) {
    console.log("vmid matches uid, proceeding with script execution...");
    // 在这里添加需要执行的逻辑
} else {
    $done({});
}
