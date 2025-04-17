export async function GET(req: Request) {
	const res = new Response();
	res.headers.set("Content-Type", "text/event-stream");
	res.headers.set("Cache-Control", "no-cache");
	res.headers.set("Connection", "keep-alive");

	// res.write("data: Hello, world!\n\n");
	// res.end();

	// Initial message
	// res.write("data: Welcome to Server-Sent Events!\n\n");

	// Send messages every 5 seconds
	// const intervalId = setInterval(() => {
	// 	const message = { time: new Date().toISOString() };
	// 	res.write(`data: ${JSON.stringify(message)}\n\n`);
	// }, 5000);

	// // Clean up on disconnect
	// req.on("close", () => {
	// 	clearInterval(intervalId);
	// 	res.end();
	// });

	return res;
}
