<template>
	<ul>
		<li v-for="message in messages" :key="message">
			<dl>
				<dt>
					<strong>{{ message.id }}</strong>
				</dt>
				<dd>{{ message.message }}</dd>
			</dl>
		</li>
	</ul>
	<input type="text" v-model="message" /><button @click="send">Send</button>
</template>

<script>
export default {
	data() {
		return { messages: [], message: "" };
	},
	beforeCreate() {
		this.connections = [];
		this.peer.on("open", (id) => {
			console.log(id);

			if (location.pathname !== "/") {
				const connection = this.peer.connect(location.pathname.substring(1));
				this.addPeer(connection);
			}

			this.peer.on("connection", (connection) => {
				this.addPeer(connection);
			});
		});
	},
	methods: {
		send() {
			this.messages.push({ id: this.peer.id, message: this.message });
			this.connections.forEach((connection) => {
				connection.send(this.message);
			});
		},
		addPeer(peer) {
			this.connections.push(peer);
			peer.on("open", () => {
				peer.on("data", (data) => {
					console.log(peer);
					this.messages.push({ id: peer.peer, message: data });
				});
			});
		},
	},
};
</script>
