from fastmcp import FastMCP

mcp = FastMCP("mcp-server")


@mcp.tool()
def hello(name: str = "world") -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"


if __name__ == "__main__":
    mcp.run()
