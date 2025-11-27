from playwright.sync_api import sync_playwright
import time

def verify_scroll_visibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")

            # Debugging: Print all section classes to ensure we can find the Hero
            sections = page.locator("section")
            print(f"Found {sections.count()} sections")

            # The Hero section is the first one
            hero = sections.first

            # Look for the content wrapper. It has classes 'relative z-10 max-w-7xl...'
            # We can select by partial class match or structure.
            # In Hero.tsx: <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl ...">
            # Playwright might not see 'motion.div' tag but the resulting div.

            content_wrapper = hero.locator("div.relative.z-10.max-w-7xl").first

            # Wait for it to be attached
            content_wrapper.wait_for(state="attached")

            print("Scrolling down 500px...")
            page.mouse.wheel(0, 500)
            time.sleep(2) # Wait for animation/reactivity

            opacity = content_wrapper.evaluate("el => getComputedStyle(el).opacity")
            print(f"Opacity at scroll 500px: {opacity}")

            print("Scrolling down to 800px...")
            page.mouse.wheel(0, 300) # total 800
            time.sleep(2)

            opacity_800 = content_wrapper.evaluate("el => getComputedStyle(el).opacity")
            print(f"Opacity at scroll 800px: {opacity_800}")

            print("Scrolling down to 1200px...")
            page.mouse.wheel(0, 400) # total 1200
            time.sleep(2)

            opacity_1200 = content_wrapper.evaluate("el => getComputedStyle(el).opacity")
            print(f"Opacity at scroll 1200px: {opacity_1200}")

            page.screenshot(path="verification/hero_scroll_final.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_scroll_visibility()
