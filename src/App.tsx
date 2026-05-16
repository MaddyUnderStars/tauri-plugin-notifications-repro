import { useState } from "react";
import "./App.css";

import {
	getUnifiedPushDistributors,
	registerForUnifiedPush,
	saveUnifiedPushDistributor,

} from "@sableclient/tauri-plugin-notifications-api";

function App() {
	const register = async () => {
		const distributor = (await getUnifiedPushDistributors()).distributors[0];
		await saveUnifiedPushDistributor(distributor);

		const { endpoint, pubKeySet } = await registerForUnifiedPush();

		if (!endpoint || !pubKeySet?.auth || !pubKeySet.pubKey) {
			return false;
		}

		console.log(`npx web-push send-notification --endpoint="${endpoint}" --auth="${pubKeySet.auth}" --key="${pubKeySet.pubKey}" --payload="hello"`);

		return true;
	}

	return (
		<div>
			<button onClick={register}>enable push with first distributor</button>
		</div>
	);
}

export default App;
