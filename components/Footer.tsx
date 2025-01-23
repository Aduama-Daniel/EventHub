
export function Footer() {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container px-4">        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FusionEdge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}